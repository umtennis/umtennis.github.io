// import "./SignupForm.css"
// import {useNavigate } from "react-router-dom";
// import {Dropdown} from "bootstrap"


function handleRegistration() {

  //will require admin review by verify payment
  //

  return false;
}

export default function SignupForm() {
  // const status = Dropdown.getOrCreateInstance({1:"student"})

  // const navigate = useNavigate();

  return (
    <div class="loginForm">
      <form>
        <h3>Register as a new member</h3>

        <div class="mt-3 form-group row">
          <label for="inputFullName" class="col-sm-4 col-form-label">Full Name</label>
          <div class="col-sm-7">
            <input type="name" class="form-control" id="inputName" placeholder="Full Name" />
          </div>
        </div>

        <div class="mt-3 form-group row">
          <label for="inputPhone" class="col-sm-4 col-form-label">Phone</label>
          <div class="col-sm-7">
            <input type="phone" class="form-control" id="inputPhone" placeholder="phone" />
          </div>
        </div>
   
        <div class="mt-3 form-group row">
          <label for="inputEmail" class="col-sm-4 col-form-label">Email</label>
          <div class="col-sm-7">
            <input type="email" class="form-control" id="inputEmail" placeholder="email" />
          </div>
        </div>

        <div class="mt-3 form-group row">
          <label for="inputStatus" class="col-sm-4 col-form-label">Status</label>
          <div class="col-sm-7">
            {/* {status} */}
          </div>
        </div>

        <div class="mt-3 form-group row">
          <label for="inputEmail" class="col-sm-4 col-form-label">Email</label>
          <div class="col-sm-7">
            <input type="email" class="form-control" id="inputEmail" placeholder="email@example.com" />
          </div>
        </div>

        <div class="mt-3 form-group row">
          <label for="inputPassword" class="col-sm-4 col-form-label">Password</label>
          <div class="col-sm-7">
          <input type="password" class="form-control" id="inputPassword" placeholder="Password" />
          <input type="password" class="mt-3 form-control" id="inputPassword" placeholder="Confirm Password" />
          </div>
        </div>
        <div class="mt-3 text-center well">
          <button class="btn btn-outline-primary m-1" onClick={(e) => {
        e.preventDefault();
        // navigate('/signup');

        handleRegistration();

        }}>Next to Payment</button>
        </div>

      </form>
    </div>
  );
}