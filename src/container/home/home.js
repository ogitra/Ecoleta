import React from 'react';
import classes from './home.module.css';
import Logo from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className={classes.container}>
      <div className={classes.container_content}>
        <header className={classes.header}>
          <img src={Logo} alt='logo' />
        </header>
        <main className={classes.main}>
          <h1 className={classes.main__title}>
            Seu marketplace <br />
            de coleta de resíduos
          </h1>
          <p className={classes.main__text}>
            Ajudamos pessoas a encontrarem pontos <br />
            de coleta de forma eficiente
          </p>
          <NavLink to='/cadastro' className={classes.search__container}>
            <span className={classes.icon__container}>
              <FiLogIn className={classes.icon}></FiLogIn>
            </span>

            <p className={classes.search__text}>Cadastrar</p>
          </NavLink>
        </main>
      </div>
    </div>
  );
};

export default Home;
