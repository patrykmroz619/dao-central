import { ComponentPropsWithoutRef } from "react";
import classNames from "classnames";
import Image from "next/image";

export enum SOCIAL_MEDIA_ICON_TYPE {
  FACEBOOK,
  TWITTER,
  DISCORD,
}

type SocialMediaIconProps = {
  type: SOCIAL_MEDIA_ICON_TYPE;
  size: number;
} & ComponentPropsWithoutRef<"div">;

export const SocialMediaIcon = (props: SocialMediaIconProps) => {
  const { type, size, className, ...restProps } = props;

  const finalClass = classNames(className);

  const icon = (() => {
    switch (type) {
      case SOCIAL_MEDIA_ICON_TYPE.FACEBOOK:
        return (
          <Image
            src="/images/icons/facebook-icon.svg"
            width={size}
            height={size}
            alt="Facebook icon"
          />
        );
      case SOCIAL_MEDIA_ICON_TYPE.TWITTER:
        return (
          <Image
            src="/images/icons/twitter-icon.svg"
            width={size}
            height={size}
            alt="Twitter icon"
          />
        );
      case SOCIAL_MEDIA_ICON_TYPE.DISCORD:
        return (
          <Image
            src="/images/icons/discord-icon.svg"
            width={size}
            height={size}
            alt="Discord icon"
          />
        );
    }
  })();

  return (
    <div className={finalClass} {...restProps}>
      {icon}
    </div>
  );
};
