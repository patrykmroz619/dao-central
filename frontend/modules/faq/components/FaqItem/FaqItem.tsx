import { ChevronDown } from "react-feather";
import { motion, AnimatePresence, MotionProps } from "framer-motion";

import { useBoolean } from "modules/common/hooks/useBoolean";
import { Text } from "modules/common/components/Typography";

import styles from "./FaqItem.module.scss";

type FaqItemProps = {
  question: string;
  answer: string;
};

export const FaqItem = (props: FaqItemProps) => {
  const { question, answer } = props;

  const [isOpen, , , toggle] = useBoolean();

  return (
    <motion.li layout="position" className={styles.faqItem}>
      <button className={styles.faqItem__question} onClick={toggle}>
        <span>{question}</span>
        <motion.span
          className={styles.faqItem__icon}
          animate={isOpen ? "open" : "close"}
          {...toggleIconMotionProps}
        >
          <ChevronDown />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div {...answerMotionProps}>
            <Text className={styles.faqItem__answer}>{answer}</Text>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

const answerMotionProps: MotionProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const toggleIconMotionProps: MotionProps = {
  variants: {
    open: {
      rotate: "0deg",
    },
    close: {
      rotate: "180deg",
    },
  },
  transition: {
    delay: 0.1,
    duration: 0.5,
  },
};
