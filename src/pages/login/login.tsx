import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Input, Button } from '../../ui';
import { LoginFormData } from '../../types';

import styles from './login.module.scss';

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    login: '',
    password: '',
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  //TODO: add request to gql
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(formData);
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
          onChange={onChange}
          name={'login'}
          ref={inputRef}
          placeholder={'Логин'}
        />

        <Input onChange={onChange} name={'password'} placeholder={'Пароль'} />

        <Button type={'submit'}>Войти</Button>
      </form>
    </div>
  );
};

export default Login;
