/**
El componente de inicio de sesión es una función React que muestra un logotipo y un mensaje de bienvenida, y redirige
al usuario a la ruta  de categorías después de 2.5 segundos.
 */
import { useEffect } from "react";
import Image from "next/image";
import styles from "./Login.module.css";
import { motion } from "framer-motion";
import { useRouter } from "next/router";


const Login = () => {
 
const router = useRouter()
  useEffect(()=>{
    setTimeout(()=>router.push('/categorias'), 2500)
  })

  return (
    <div className={styles.container}>
      <div className={styles.container_login}>
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeOut", duration: 2 }}
          className={styles.container.animation}
        >
        <div className={styles.container_logo}>
          <Image
            src="/logo.svg"
            alt="TL apps logo"
            width={280}
            height={280}
            priority
          />
          <h1>
            Bienvenido al <br />
            Exhibidor Digital
          </h1>
        </div>
        </motion.div>
  
      </div>
    </div>
  );
};

export default Login;
