import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [title, setTitle] = useState();

    const onFormSubmit = (e) => {
        e.preventDefault();

        onSearch(title);
    }

    return (
        <form onSubmit={onFormSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}    
                />
            </div>
            <button type="submit">Search</button>
        </form>
    )
}

export default SearchBar;