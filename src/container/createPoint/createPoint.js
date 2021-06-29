import React, { useState, useEffect } from 'react';
import classes from './createPoint.module.css';
import Logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import Input from '../../components/input';
import Axios from 'axios';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { ReactComponent as Battery } from '../../assets/baterias.svg';
import { ReactComponent as Eletronics } from '../../assets/eletronicos.svg';
import { ReactComponent as Lamps } from '../../assets/lampadas.svg';
import { ReactComponent as Oil } from '../../assets/oleo.svg';
import { ReactComponent as Organic } from '../../assets/organicos.svg';
import { ReactComponent as Paper } from '../../assets/papeis-papelao.svg';

const CreatePoint = () => {
  const [uf, setUf] = useState([]);
  const [selectedUF, setSelectedUF] = useState([]);
  const [city, setCity] = useState([]);
  const [data, setData] = useState({});
  const [selectedItems, setselectedItems] = useState([]);
  const [items] = useState([
    {
      id: 1,
      title: 'Lâmpadas',
      img: <Lamps />,
    },
    {
      id: 2,
      title: 'Pilhas e Baterias',
      img: <Battery />,
    },
    {
      id: 3,
      title: 'Papéis e Papelão',
      img: <Paper />,
    },
    {
      id: 4,
      title: 'Resíduos Eletrônicos',
      img: <Eletronics />,
    },
    {
      id: 5,
      title: 'Resíduos Orgânicos',
      img: <Organic />,
    },
    {
      id: 6,
      title: 'Óleo de Cozinha',
      img: <Oil />,
    },
  ]);

  useEffect(() => {
    Axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then((response) => {
      const fetchUF = [];
      response.data.map((item) => {
        return fetchUF.push(item.sigla);
      });
      setUf(fetchUF.sort());
    });
  }, []);

  function handleChooseUF(evt) {
    const selectUF = evt.target.value;
    setSelectedUF(selectUF);
  }

  useEffect(() => {
    Axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`).then(
      (response) => {
        const fetchCity = [];
        response.data.map((item) => {
          return fetchCity.push(item.nome);
        });
        setCity(fetchCity);
      }
    );
  }, [selectedUF]);

  function handleInput(evt, id) {
    let prevData = { ...data };
    prevData[id] = evt.target.value;
    setData(prevData);
  }

  function onSelectItem(id) {
    const ids = [...selectedItems];

    if (!ids.includes(id)) {
      ids.push(id);
      setselectedItems(ids);
    } else {
      const filtered = ids.filter((item) => item !== id);
      setselectedItems(filtered);
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.container__content}>
        <header className={classes.header}>
          <img src={Logo} alt='logo' />
          <NavLink to='/' className={classes.buttonBack}>
            <span>
              <FiArrowLeft></FiArrowLeft>
            </span>
            <p>Voltar para a home</p>
          </NavLink>
        </header>
        <form>
          <fieldset>
            <h1>Cadastro do ponto de coleta</h1>
            <h2>Dados</h2>
            <Input
              className={classes.inputPoint}
              label='Nome da entidade'
              type='text'
              id='name'
              onChange={(evt) => handleInput(evt, 'name')}
            ></Input>
            <Input
              className={classes.inputPoint}
              label='E-mail'
              type='text'
              onChange={(evt) => handleInput(evt, 'email')}
            ></Input>
            <Input
              className={classes.inputPoint}
              label='Whatsapp'
              type='text'
              onChange={(evt) => handleInput(evt, 'whats')}
            ></Input>
          </fieldset>

          <fieldset>
            <div className={classes.fieldsetAdress}>
              <h2>Endereço</h2>
              <p>Selecione o endreço no mapa</p>
            </div>

            <Map center={[-23.6152952, -46.5258909]} zoom={16} className={classes.leaflet_container}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <Marker position={[-23.6152952, -46.5258909]}></Marker>
            </Map>

            <div className={classes.fieldsetAdress}>
              <select className={(classes.inputPoint, classes.inputPointUF)} onChange={handleChooseUF}>
                <option value='0'> UF</option>
                {uf.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>

              <select className={(classes.inputPoint, classes.inputPointCity)}>
                <option value='0'>Escolha uma cidade</option>

                {city.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </fieldset>

          <fieldset>
            <div className={classes.fieldsetItems}>
              <h2>Ítens de coleta</h2>
              <p>Selecione um ou mais ítens abaixo</p>
            </div>
            <ul className={classes.listItemsGrid}>
              {items.map((item) => (
                <li
                  key={item.id}
                  className={[
                    classes.listItemsGrid__item,
                    selectedItems.includes(item.id) && classes.listItemsGrid__itemSelected,
                  ].join(' ')}
                  aqui
                  onClick={() => onSelectItem(item.id)}
                >
                  {item.img}
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </fieldset>
          <button className={classes.button} type='submit'>
            Cadastrar ponto de coleta
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePoint;
