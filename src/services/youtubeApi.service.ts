import { SearchListParams, SearchResult, SearchListResponse, VideoListResponse } from 'youtubeDataAPI';

import * as ytdlDiscord from 'ytdl-core-discord';
import * as ytdl from 'ytdl-core';
import * as Readable from 'stream';
import { google, youtube_v3 } from 'googleapis';
import { GaxiosResponse } from 'gaxios';
import { YoutubeAPIError } from './Resources/YoutubeAPIError';

// const API_URI = new Collection<ApiResources, string>([
//     ['SEARCH', 'https://www.googleapis.com/youtube/v3/search'],
//     ['VIDEOS', 'https://www.googleapis.com/youtube/v3/videos']
// ])
// const URL_REG_EXP = /^(?:https?:\/\/)?(?:w{3}\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=)[\w-]{11}$/i;
// const ID_REG_EXP = /[\w-]{11}/;

// https://developers.google.com/youtube/v3/docs
// let a = google.youtube('v3')
// a.search.list({ key: process.env.YOUTUBE_KEY, q: 'of monsters and men', part: 'snippet', type: 'video' }).then(console.log)
// .catch(console.log)

/*
max credit is 10000
*/

export default class YoutubeAPI {
    private _youtube = google.youtube('v3');
    private _quota: number = 0; // maybe somehow do a daily save state for this?
    private readonly _key: string;

    constructor(key: string) {
        this._key = key;

        this._verify(key);
        process.on('beforeExit', code => {
            // save quota to sql database or something
        })
    }

    get key(): string {
        return this._key;
    }

    private async _verify(key: string): Promise<void> {
        let response: GaxiosResponse<VideoListResponse>
        
        try {
            response = await this._youtube.videos.list({ key: this._key, part: 'id', id: 'LDxcfTm1QTc' });
            this._quota += 1; // i think its 1 point
            // response = <VideoListResponse> (await Util.request({
            //     method: 'GET',
            //     url: this.constructUri('VIDEOS', { part: 'id', id: 'LDxcfTm1QTc' })
            // })).body;
        } catch(e) {
            throw e;
        }
    }

    // public constructUri(apiResource: ApiResources, params: { [param: string]: string | undefined }): string {
    //     const resource: ApiResources = <ApiResources> apiResource.toUpperCase();
    //     let requestUri: string;

    //     if (API_URI.has(resource)) {
    //         requestUri = `${API_URI.get(resource)}?key=${this._key}`     
    //     } else  {
    //         throw new Error('A valid api resource is required');
    //     }
    
    //     for (const param in params) {
    //         if (typeof params[param] !== 'undefined') {
    //             requestUri += `&${param}=${params[param]}`;
    //         }
    //     }
    //     return requestUri;
    // }

    public static isValidUrl(url: string): boolean {
        if (typeof url !== 'string') {
            return false;
        }
        return ytdl.validateURL(url);
    }

    public static getVideoId(url: string): string {
        let videoID: string | Error = ytdl.getURLVideoID(url);

        return !(videoID instanceof Error) ? videoID : '';
    }

    public async search(optionsOrQuery: string | SearchListParams, options?: SearchListParams): Promise<Collection<string, SearchResult>> {
        let results: Collection<string, SearchResult> = new Collection(); //  replace wtih Map
        let response: GaxiosResponse<SearchListResponse> = {} as GaxiosResponse<SearchListResponse>;
        let resultsList: SearchResult[] = [];
        let params: SearchListParams = typeof optionsOrQuery === 'string' ? { q: optionsOrQuery } : optionsOrQuery;

        if (typeof options === 'object') {
            params = Object.assign({}, params, options, { part: 'snippet', type: params.type || 'video' });
        }

        // get video id if user sends a youtube link to conserve api quota costs
        // TODO: maybe also check for playlist and channel links
        if (params.q && YoutubeAPI.isValidUrl(params.q)) {
            // more work needs to be done here
            //return this._yt.videos.list(Youtube.getVideoId(params.q))
        } 

        try {
            // later on, you're gonna wanna add in cache control and etag usage
            // more info here https://developers.google.com/youtube/v3/getting-started#etags
            response = await this._youtube.search.list(Object.assign({}, { key: this._key }, params));
            // response = await Util.request({
            //     method: 'GET',
            //     url: this._yt.constructUri('SEARCH', Object.assign({}, optionsOrQuery, { part: 'snippet', type: params.type || 'video' })) // inject options here
            // });
            resultsList = response.data.items || [];
            
            // maybe create a process items function ?
            for (const item of resultsList) {
                // each item can be a channel, video, or playlist resource
                if (item.id && item.id.kind) {
                    if (item.id.kind === 'youtube#video') {

                    } else if (item.id.kind === 'youtube#playlist') {
                        
                    } else if (item.id.kind === 'youtube#channel') {
                        
                    }
                }
                results.set(item, item);
            }
        } catch(e) {
            throw new YoutubeAPIError(e);
        }

        

        return results;
    }
}