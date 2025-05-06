import './App.css'
import VisualiserQ2 from './visualiserQ2.jsx'
import VisualiserQ3 from './visualiserQ3.jsx'



function App() {
  

  return (
    <>
      <h2>Tracé de la hauteur de l'eau au port de New York</h2>
      <h4>Question 2</h4>
      <VisualiserQ2 dateDebut={"06/05/2025 00:00:00"}/>
      <div id="visualizationQ2"></div>
      <br/><br/>
      <h4>Question 3</h4>
      <VisualiserQ3 date={"06/05/2025 00:00:00"}/>
      <div id="visualizationQ3"></div>
    </>
  )
}

export default App
