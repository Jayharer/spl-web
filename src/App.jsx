import useInputFormField from "./shared/useInputFormField"
import { apiSubmitForm } from './backend/api'
import { toast } from 'react-toastify'
import { loadRazorpay } from './loadRazorpay'

var rzp;

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
  var last_name = useInputFormField();
  var email = useInputFormField();
  var contact = useInputFormField();

  const saveFormdetails = async () => {
    const userData = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: "jay@gmail.com",
      contact: "7506988717"
    }
    console.log(userData)

    const resp = await apiSubmitForm(userData);
    if (resp.status_code === 200) {
      toast.success("Success form submit")
    } else {
      toast.warning("Failed form submit")
    }

    first_name.value = "";
    last_name.value = "";

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    handlePayment();
    // saveFormdetails();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            className="form-control"
            name="FirstName"
            type="text"
            value={first_name.value}
            onChange={first_name.onChange}
            placeholder="first name"
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            className="form-control"
            name="last_name"
            type="text"
            value={last_name.value}
            onChange={last_name.onChange}
            placeholder="last name"
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
