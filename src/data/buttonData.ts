export interface ButtonData {
    action: string;
    onClick: () => void;
  }
  
  export const buttonData: { [key: string]: ButtonData } = {
    btn1: {
      action: "View",
      onClick: () => {},
    },
    btn2: {
      action: "Update",
      onClick: () => {},
    },
    btn3: {
      action: "Delete",
      onClick: () => {},
    },
    btn4: {
      action: "Update Demographic Data",
      onClick: () => {},
    },
  };
  