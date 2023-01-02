import Image from 'next/image';

import organizationImage from 'public/illustrations/organization.svg';
import styles from './LoginIllustration.module.scss';

export function LoginIllustration() {
  return (
    <div className={styles.wrapper}>
      <Image src={organizationImage} alt="DAO Central illustration" priority />
    </div>
  );
}
