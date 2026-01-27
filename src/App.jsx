import useInputFormField from "./shared/useInputFormField"
import { apiSubmitForm } from './backend/api'
import { toast } from 'react-toastify'
import { loadRazorpay } from './loadRazorpay'

var rzp;

const saveFormdetails = async () => {
  const userData = {
    first_name: first_name.value,
    village: village.value,
  }
  console.log(userData)

  const resp = await apiSubmitForm(userData);
  console.log(resp)
  if (resp.status === 200) {
    toast.success("Success form submit")
  } else {
    toast.warning("Failed form submit")
  }

  first_name.value = "";
  village.value = "";

}

const handlePayment = async () => {
  const loaded = await loadRazorpay()

  if (!loaded) {
    alert('Razorpay SDK failed to load')
    return
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY,
    amount: 100,
    currency: 'INR',
    name: 'My App',
    description: 'Test Transaction',
    order_id: "order_S8oBkKbDlduUFv",
    prefill: {
      name: "jay harer",
      email: "jay@gmail.com",
      contact: "+917506988717"
    },
    theme: {
      color: "#3399cc"
    },
    handler: function (resp) {
      console.log(resp)
    },
  }

  rzp = new Razorpay(options);
  rzp.open();

  rzp.on('payment.failed', function (resp) {
    console.log(resp.error.code);
    console.log(resp.error.description);
    console.log(resp.error.source);
    console.log(resp.error.step);
    console.log(resp.error.reason);
    console.log(resp.error.metadata.order_id);
    console.log(resp.error.metadata.payment_id);
  });

}


function App() {

  var first_name = useInputFormField();
  var village = useInputFormField();

  const handleSubmit = async (event) => {
    event.preventDefault();
    handlePayment();
    // saveFormdetails();
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
            placeholder="first Name"
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
            placeholder="village Name"
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
