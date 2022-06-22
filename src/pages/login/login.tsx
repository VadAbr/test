import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Input, Button } from '../../ui';
import { mutations } from '../../gql';
import { Paths } from '../../constants';
import { useAuth } from '../../hooks';

import styles from './login.module.scss';

const initialState = {
  username: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [login, { loading }] = useMutation(mutations.LOGIN);
  const { setAuth } = useAuth();

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      const { data } = await login({ variables: { username, password } });
      setAuth(data.login.token);
      navigate(Paths.dashboard);
    } catch (e) {}
  };

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormData((state) => ({ ...state, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Вход</h1>

      <p className={styles.text}>
        Уникальная технология доступная для вашего бизнеса уже сейчас!
      </p>

      <form onSubmit={onSubmit}>
        <Input
          ref={inputRef}
          onChange={onChange}
          name={'username'}
          placeholder={'Логин'}
        />

        <Input onChange={onChange} name={'password'} placeholder={'Пароль'} />

        <Button disabled={loading} type={'submit'}>
          Войти
        </Button>
      </form>
    </div>
  );
};

export default Login;
