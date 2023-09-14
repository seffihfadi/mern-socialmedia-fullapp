export const PinsAnim = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition:{ 
      duration: .2,
      when: 'beforeChildren',
      staggerChildren: 0.11,
    }
  }
};

export const PinAnim = {
  hidden: { opacity: 0, y: -30 },
  show: { opacity: 1, y: 0 }
};