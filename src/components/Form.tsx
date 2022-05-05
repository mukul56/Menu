import React, { useState } from "react";
import "./Form.css";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { FormProps } from "./Types";
import { cuisineTypesOptions, dietOptions, intoleranceOptions } from "../utils";


const Form: React.FC<FormProps> = ({ submitSearch, randomSearch}) => {

  const [meal, setMeal] = useState('');
  const [cuisineTypes, setCuisineTypes] = useState<string[]>([]);
  const [dietRestrictions, setDietRestrictions] = useState<string[]>([]);
  const [intolerances, setIntolerances] = useState<string[]>([]);
  const [cuisineCheckedState, setCuisineCheckedState] = useState<boolean[]>(
    new Array(cuisineTypesOptions.length).fill(false)
  );
  const [dietCheckedState, setDietCheckedState] = useState<boolean[]>(
    new Array(dietOptions.length).fill(false)
  );

  const [intoleranceCheckedState, setIntoleranceCheckedState] = useState<boolean[]>(
    new Array(intoleranceOptions.length).fill(false)
  );

  const handleChange = (event: any) => {
    const sectionID = event.target.parentElement.parentElement.parentElement.id;
    if (sectionID === "cuisineType") {
      cuisineTypes.includes(event.target.id) ? setCuisineTypes(cuisineTypes.filter(selection => selection !== event.target.id)) : setCuisineTypes([...cuisineTypes, event.target.id]);
    }
    else if (sectionID === "dietRestrictions") {
      dietRestrictions.includes(event.target.id) ? setDietRestrictions(dietRestrictions.filter(selection => selection !== event.target.id)) : setDietRestrictions([...dietRestrictions, event.target.id]);
    }
    else if (sectionID === "intolerances") {
      intolerances.includes(event.target.id) ? setIntolerances(intolerances.filter(selection => selection !== event.target.id)) : setIntolerances([...intolerances, event.target.id]);
    }
  }

  const handleCuisineCheckBoxes = (position: number) => {
    const updatedCuisineCheckedState = cuisineCheckedState.map((item: boolean, index: number) => index === position ? !item : item);
    setCuisineCheckedState(updatedCuisineCheckedState);
  }
  
  const handleDietCheckBoxes = (position: number) => {
    const updatedDietCheckedState = dietCheckedState.map((item: boolean, index: number) => index === position ? !item : item);
    setDietCheckedState(updatedDietCheckedState);
  }

  const handleIntoleranceCheckBoxes = (position: number) => {
    const updatedIntoleranceCheckedState = intoleranceCheckedState.map((item: boolean, index: number) => index === position ? !item : item);
    setIntoleranceCheckedState(updatedIntoleranceCheckedState);
  }

  const clearInputs = () => {
    setMeal('');
    setCuisineCheckedState(new Array(cuisineTypesOptions.length).fill(false));
    setDietCheckedState(new Array(dietOptions.length).fill(false));
    setIntoleranceCheckedState(new Array(intoleranceOptions.length).fill(false));
    setCuisineTypes([]);
    setDietRestrictions([]);
    setIntolerances([]);
  }

  const mapColumn = (eventHandler: (position: number) => void, state:any, stateArray:any, columnStyle:string) => {
    return(
      <div className={`check-column ${columnStyle}`}>
        {stateArray.map((option:any, index:number) => {
          return (
            <div className="check-wrapper">
              <input type="checkbox" id={option.id} checked={state[index]} onChange={(event) => {
                handleChange(event);
                eventHandler(index)
                }}/>
              <label>{option.name}</label>
            </div>
          )
        })}
      </div>
    )
}

  return (
    <section className="form-section">
      <aside className="questionnaire-info">
        <img className="bulb-icon" src="lightbulb.jpg" alt="lightbulb-icon"></img>
        <div className="questionnaire-info-text">
          <h2>Questionnaire</h2>
          <p>First, answer some questions about what you're craving. Feel free to leave these blank and generate some random foods.</p>
        </div>
      </aside>
      <form className="questions">
        <ul>
          <li className="meal-input">

            <div className="num-circle">
              <p>1</p>
            </div>
            <div className="question-content">
              <p>What kind of meal are you looking for?</p>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="meal-type-select-label">Meal Type</InputLabel>
                <Select
                  className="option-select"
                  labelId="meal-type-select-label"
                  id="meal-type-select"
                  value={meal}
                  label="Meal Type"
                  autoWidth
                  onChange={event => setMeal(event.target.value)}
                >
                  <MenuItem value={"breakfast"}>Breakfast</MenuItem>
                  <MenuItem value={"main_course"}>Main Course</MenuItem>
                  <MenuItem value={"side_dish"}>Side Dish</MenuItem>
                  <MenuItem data-cy="dessert" value={"dessert"}>Dessert</MenuItem>
                  <MenuItem value={"appetizer"}>Appetizer</MenuItem>
                  <MenuItem value={"fingerfood"}>Fingerfood</MenuItem>
                  <MenuItem value={"snack"}>Snack</MenuItem>
                </Select>
              </FormControl>
            </div>
          </li>
          <li>
            <div className="num-circle">
              <p>2</p>
            </div>
            <div className="question-content">
              <p>Are you interested in a type of cuisine?</p>
              <div className="checkbox-container" id="cuisineType">
                {mapColumn(handleCuisineCheckBoxes, cuisineCheckedState, cuisineTypesOptions, 'cuisine')}
              </div>
            </div>
          </li>
          <li>
            <div className="num-circle">
              <p>3</p>
            </div>
            <div className="question-content">
              <p>Any dietary restrictions?</p>
              <div className="checkbox-container" id="dietRestrictions">
                {mapColumn(handleDietCheckBoxes, dietCheckedState, dietOptions, 'diet')}
              </div>
            </div>
          </li>
          <li>
            <div className="num-circle">
              <p>4</p>
            </div>
            <div className="question-content">
              <p>Show me results without:</p>
              <div className="checkbox-container" id="intolerances">
                {mapColumn(handleIntoleranceCheckBoxes, intoleranceCheckedState, intoleranceOptions, 'intolerance')}
              </div>
            </div>
          </li>
        </ul>
        <div className="form-button-container">
          <div className="form-button-wrapper">
            <button className="submit-button"onClick={event => {
              submitSearch(event, meal, cuisineTypes, dietRestrictions, intolerances);
              clearInputs();
              }}>Submit</button>
            <button onClick={event => {
              randomSearch(event)
            }}>Random</button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default Form;