import { useShowcases } from './useShowcases';
import styles from './index.module.scss';

const getDomain = (url: string) => new URL(url).hostname;

const TYPE_MAP = {
  doc: 'Doc',
  module: 'Module',
  builder: 'Builder',
  framework: 'Framework',
};

export const ShowcaseList = () => {
  const showcases = useShowcases();

  return (
    <div className={styles.wrapper}>
      {showcases.map((item) => {
        return (
          <div key={item.url} className={styles.card}>
            <img src={item.preview} className={styles.preview} />
            <div className={styles.bottom}>
              <div className={styles.name}>
                {item.name}
                <span className={styles.type}>{TYPE_MAP[item.type]}</span>
              </div>
              <div
                onClick={() => window.open(item.url)}
                className={styles.domain}
              >
                {getDomain(item.url)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
