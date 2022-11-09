import { dispatchOnCall, store } from '../../../state/store';
import { useStoreWithInitializer } from '../../../state/storeHooks';
import { buildGenericFormField } from '../../../types/genericFormField';
import { GenericForm } from '../../GenericForm/GenericForm';
import { initializeRegister, RegisterState, startSigningUp, updateErrors, updateField } from './Register.slice';
import { loadUserIntoApp, UserForRegistration } from '../../../types/user';
import { signUp } from '../../../services/conduit';
import { ContainerPage } from '../../ContainerPage/ContainerPage';

export function Register() {
  const { errors, signingUp, user } = useStoreWithInitializer(
    ({ register }) => register,
    dispatchOnCall(initializeRegister())
  );

  return (
    <div className='auth-page'>
      <ContainerPage>
        <div className='col-md-6 offset-md-3 col-xs-12'>
          <div className='text-xs-center'>
            <img src='besure.jpg' className='text-xs-center' />
          </div>
          <h1 className='text-xs-center'>Sign up</h1>
          <div className='text-xs-center color-green '>------------------------------------------------- &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; -------------------------------------------------</div>
         

          <GenericForm
            disabled={signingUp}
            formObject={user as unknown as Record<string, string>}
            submitButtonText='Sign up'
            errors={errors}
            onChange={onUpdateField}
            onSubmit={onSignUp(user)}
            fields={[
              buildGenericFormField({ name: 'username', placeholder: 'Firstname', classname:'col-lg-6',label:'First Name' }),
              buildGenericFormField({ name: 'lastname', placeholder: 'Lastname', classname:'col-lg-6',label:'Last Name' }),
              buildGenericFormField({ name: 'email', placeholder: 'Email',classname:'col-lg-12',label:'Email' }),
              buildGenericFormField({ name: 'password', placeholder: 'Enter atleast 8+ characters', type: 'password',classname:'col-lg-12',label:'Password' }),
            ]}
          />
          <div className='text-xs-center'><br></br>
          <input type="checkbox" id="" name="" value=""/>
          <label>&nbsp; By signing up. I agree with the</label><a href='/#/'>&nbsp;Tearms of User &nbsp; & &nbsp;</a><a href='/#/'>Privacy Policy</a>
          </div>
          <div className=''><br></br></div>
          <div>
          <p className='text-xs-center'>Already Have an account?
            <a href='/#/login'><span>&nbsp; </span><span> </span>  Sign in?</a>
          </p>
          </div>
        </div>
      </ContainerPage>
    </div>
  );
}

function onUpdateField(name: string, value: string) {
  store.dispatch(updateField({ name: name as keyof RegisterState['user'], value }));
}

function onSignUp(user: UserForRegistration) {
  return async (ev: React.FormEvent) => {
    ev.preventDefault();
    store.dispatch(startSigningUp());
    const result = await signUp(user);

    result.match({
      err: (e) => store.dispatch(updateErrors(e)),
      ok: (user) => {
        location.hash = '#/';
        loadUserIntoApp(user);
      },
    });
  };
}
