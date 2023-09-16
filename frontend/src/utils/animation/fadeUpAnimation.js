export const ParentAnim = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition:{ 
      duration: .2,
      when: 'beforeChildren',
      staggerChildren: 0.11,
    }
  }
};

export const ChildAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export const FadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition:{ 
    duration: .2
  }
}