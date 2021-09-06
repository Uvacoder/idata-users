import React from 'react';
import {
  useHistory,
  useLocation
} from 'react-router';
import './loginPage.scss';
import logo from '../../assets/login-logo.png';
import instagramLogo from '../../assets/instagram.png';
import linkedinLogo from '../../assets/linkedin.png';
import { useAuth } from '../../context';

const LoginPage: React.FC = () => {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } } as any;
  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  console.log('from :>> ', from);
  console.log('login :>> ', login);

  return (
    <section className="login__page">
      <div className="login__banner-wrapper">
        <h1 className="login__banner-title">Bienvenido</h1>
        <p className="login__banner-text">
          A <span className="login__banner-text--brand">Contáctame</span> nuestra plataforma, donde podrás tener acceso a todos tus amigos con solo un clic.
        </p>
      </div>
      <div className="login__form-wrapper">
        <img src={logo} alt="logo" className="login__form-image" />
        <h2 className="login__form-title">Contáctame</h2>
        <form action="" className="login__form-data">
          <div className="login__form-group">
            <label htmlFor="user">Usuario</label>
            <input type="text" id="user" className="login__form-input" />
          </div>
          <div className="login__form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" className="login__form-input" />
          </div>
          <div className="login__form-forgot-password">
            <a href="www.google.com" className="login__form-forgot-password-link">Olvidé mi contraseña</a>
          </div>
          <button className="login__form-submit-button">Ingresar</button>
        </form>
        <div className="login__social-wrapper">
          <p className="login__social-text">Siguenos en nuestras redes sociales</p>
          <div className="login__social-icons">
            <a href="www.linkeding.com" target="_blank">
              <img src={linkedinLogo} alt="Linkedin" />
            </a>
            <a href="www.instagram.com" target="_blank">
              <img src={instagramLogo} alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
