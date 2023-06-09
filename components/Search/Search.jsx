import Image from "next/image";
import styles from "./Search.module.css";
import { useRouter } from "next/router";
import { MdSearchOff } from "react-icons/md";

const Search = ({ result, input, setToggleSideBar, close, setInput, filter }) => {
  const router = useRouter();

  return (
    <div
      className={
        input.length == 0 && result.length == 0
          ? `${styles.empty}`
          : `${styles.container}`
      }
    >
      {input.length > 0 && result.length === 0 ? (
        <div className={styles.notfound}>
          No se encontraron resultados... <MdSearchOff size={200} />
        </div>
      ) : (
        result.map((item) => (
          <div key={item.id}>
            <div  className={styles.card_container}>
              <div
                className={styles.card}
                onClick={() => {
                  router.push(`/producto/${item.id}`); close(false); filter(""); setInput("") 
                }}
              >
                <Image
                  src={item.img}
                  width={150}
                  height={150}
                  alt="logo"
                  priority
                />
                <div className={styles.card_name}>{item.name}</div>
                <div className={styles.card_sku}>SKU: {item.codigo}</div>
                {item.volt == null ? null : (
                  <div className={styles.card_sku}>VOLTAJE: {item.volt}</div>
                )}
              </div>
            </div>
            <div key={item.id} className={styles.card_container_sm}>
              <div
                className={styles.card}
                onClick={() => {
                  router.push(`/producto/${item.id}`); setToggleSideBar(false); 
                }}
              >
                <Image
                  src={item.img}
                  width={150}
                  height={150}
                  alt="logo"
                  priority
                />
                <div className={styles.card_name}>{item.name}</div>
                <div className={styles.card_sku}>SKU: {item.codigo}</div>
                {item.volt == null ? null : (
                  <div className={styles.card_sku}>VOLTAJE: {item.volt}</div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Search;

//<h1>No se encontraron resultados</h1>
