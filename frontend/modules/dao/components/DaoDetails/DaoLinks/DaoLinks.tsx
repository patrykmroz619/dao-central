import { Globe } from "react-feather";

import {
  SocialMediaIcon,
  SOCIAL_MEDIA_ICON_TYPE,
} from "@/infrastructure/ui/core/Icon/SocialMediaIcon";
import { DAO_EXTRA_LINKS_TYPES } from "modules/dao/constants/daoExtraLinksTypes";

import styles from "./DaoLinks.module.scss";

type DaoLinksProps = {
  links: Array<{
    type: DAO_EXTRA_LINKS_TYPES;
    url: string;
  }>;
};

export const DaoLinks = (props: DaoLinksProps) => {
  const { links } = props;

  return (
    <div>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.url}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.type === DAO_EXTRA_LINKS_TYPES.FACEBOOK ? (
                <SocialMediaIcon
                  type={SOCIAL_MEDIA_ICON_TYPE.FACEBOOK}
                  size={36}
                />
              ) : link.type === DAO_EXTRA_LINKS_TYPES.TWITTER ? (
                <SocialMediaIcon
                  type={SOCIAL_MEDIA_ICON_TYPE.TWITTER}
                  size={36}
                />
              ) : link.type === DAO_EXTRA_LINKS_TYPES.DISCORD ? (
                <SocialMediaIcon
                  type={SOCIAL_MEDIA_ICON_TYPE.DISCORD}
                  size={36}
                />
              ) : (
                <Globe size={36} />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
