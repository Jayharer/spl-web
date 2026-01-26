import useInputFormField from "./shared/useInputFormField"
import './App.css'

function App() {

  var first_name = useInputFormField();
  var village = useInputFormField();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      first_name: first_name.value,
      village: village.value,
    }
    console.log(userData)
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            className="form-control"
            name="FirstName"
            type="text"
            value={first_name.value}
            onChange={first_name.onChange}
            placeholder="First Name"
            required
          />
        </div>
        <div>
          <label>Village</label>
          <input
            className="form-control"
            name="Village"
            type="text"
            value={village.value}
            onChange={village.onChange}
            placeholder="First Name"
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default App
