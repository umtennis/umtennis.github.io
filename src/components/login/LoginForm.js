import "./LoginForm.css"
import {useNavigate } from "react-router-dom";

//   return (
//     <form id="loginForm">
//       <div class="form-group row">
//         <label for="exampleInputEmail1" class="form-label">Email address</label>
//         <div class="col-sm-10">
//           <input type="text" id="staticEmail" value="type your email here" />
//         </div>
//       </div>
//       <div class="form-group row">
//         <label for="exampleInputPassword1" class="form-label">Password</label>
//         <input type="password" class="form-control" id="exampleInputPassword1" />
//       </div>
//       <div class="mb-3 form-check">
//         <input type="checkbox" class="form-check-input" id="exampleCheck1" />
//         <label class="form-check-label" for="exampleCheck1">Check me out</label>
//       </div>
//       <button type="submit" class="btn btn-primary">Submit</button>

//     </form>
//   )
// }

export default function LoginForm() {
  const navigate = useNavigate();
  return (
    <div class="loginForm">
      <form>
        <h3>Login to access members' area:</h3>
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
          </div>
        </div>
        <div class="mt-3 text-center well">
          <button class="btn btn-outline-primary m-1" onClick={(e) => {
        e.preventDefault();
        navigate('/signup');
        }}>Sign up</button>
          <button class="btn btn-outline-primary m-1" href="/login">Login</button>
        </div>

      </form>
    </div>

  );
}