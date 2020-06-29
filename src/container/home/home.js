import React from 'react';
import classes from './home.module.css';
import Logo from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className={classes.home__container}>
      <div className={classes.home__content}>
        <header>
          <img src={Logo} alt='logo' />
        </header>
        <main>
          <h1>
            Seu marketplace <br />
            de coleta de resíduos
          </h1>
          <p>
            Ajudamos pessoas a encontrarem pontos <br />
            de coleta de forma eficiente
          </p>
          <NavLink to='/cadastro' className={classes.search__container}>
            <FiLogIn className={classes.search__item}></FiLogIn>
            <p className={classes.search__description}>Cadastro</p>
          </NavLink>
        </main>
      </div>
    </div>
  );
};

export default Home;
