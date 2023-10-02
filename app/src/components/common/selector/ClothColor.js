const ClothColor = ({ cloth, setCloth, props }) => (
  <div
    id='tablecloth'
    onClick={(e) => setCloth(e.target.value)}
    className='cloth-item'
    style={{
      "--bg-cloth": cloth,
    }}
  ></div>
);

export default ClothColor;
/*   const [tcloth, setTcloth] = useState("#ffffff");
    onChange={(event) => props.onChange(event.target.value)}
        style={{
      backgroundImage: `url(${cloth})`,
      "--bg-cloth": cloth,
    }}
 */
