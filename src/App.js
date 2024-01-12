// import { Component } from "react";
import { useState, useEffect } from "react";

import SearchBox from "./components/search-box/search-box.component";
import CardList from "./components/card-list/card-list.component";
import "./App.css";

const App = () => {

  const [searchField, setSearchField] = useState(''); //[value we want to store, a setter function]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)

  useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []) //Two Arguments: Callback function and array of dependencies
  //You pass an empty array as dependency array when you only want it to run once

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters)
  },[monsters, searchField])

  const onSearchChange = (event) => {
          const searchFieldString = event.target.value.toLocaleLowerCase();
          setSearchField(searchFieldString)
  }

  return (
    <div className="App">
      <h1 className="app-title"> Monsters Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="Search Monsters"
        className="search-box"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};
export default App;
