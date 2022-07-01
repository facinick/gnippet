interface Props {
  color: string
  background: string
}

export const zigzag = ({ color, background }: Props) => `
background-color: ${background};
opacity: 0.8;
background-image:  linear-gradient(135deg, ${color} 25%, transparent 25%), linear-gradient(225deg, #444cf7 25%, transparent 25%), linear-gradient(45deg, #444cf7 25%, transparent 25%), linear-gradient(315deg, #444cf7 25%, #e5e5f7 25%);
background-position:  10px 0, 10px 0, 0 0, 0 0;
background-size: 20px 20px;
background-repeat: repeat;`

export const polka = ({ color, background }: Props) => `
background-color: ${background};
opacity: 1;
background-image: radial-gradient(${color} 0.5px, ${background} 0.5px);
background-size: 10px 10px;`

export const polkav2 = ({ color, background }: Props) => `
background-color: ${background};
opacity: 0.8;
background-image:  radial-gradient(${color} 0.5px, transparent 0.5px), radial-gradient(${color} 0.5px, ${background} 0.5px);
background-size: 20px 20px;
background-position: 0 0,10px 10px;`
