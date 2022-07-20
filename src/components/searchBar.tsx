const SearchBar = ({ setQuery, query, objects }) => {
    return <div className="SearchMain">
        <h1>Vyhledávač uživatelů</h1>
        <div className="search">
            <input className="Seachinput" type="text" placeholder="Vyhledej uživatele" onChange={event => setQuery(event.target.value)} />
            {query && objects && objects.filter(object => {
                if (object.userName.toLowerCase().includes(query.toLowerCase())) {
                    return object;
                }
            }).map((user, index) => (
                <div key={index}>
                    <p className="Searchresult">
                        <a target="_self" href={`/profile/public/?u=${user.userName}`}>@{user.userName}</a>
                    </p>
                </div>
            ))}
        </div>
    </div>;
}

export default SearchBar;