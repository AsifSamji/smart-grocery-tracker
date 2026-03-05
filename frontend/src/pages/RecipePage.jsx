import "../styles/Recipe.css";
import recipes from "./recipes";
import { useState } from "react";

const RecipePage = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="recipe-page">
      <h1 className="title">🍽️ Recipes</h1>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe-card"
            onClick={() => setSelected(recipe)}
          >
            <img src={recipe.image} alt={recipe.name} />
            <h3>{recipe.name}</h3>
            <p>{recipe.time}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="recipe-modal">
          <div className="recipe-content">
            <span className="close" onClick={() => setSelected(null)}>×</span>

            <img src={selected.image} alt={selected.name} />
            <h2>{selected.name}</h2>

            <h4>Ingredients</h4>
            <ul>
              {selected.ingredients.map((i, index) => (
                <li key={index}>{i}</li>
              ))}
            </ul>

            <h4>Steps</h4>
            <ol>
              {selected.steps.map((s, index) => (
                <li key={index}>{s}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipePage;