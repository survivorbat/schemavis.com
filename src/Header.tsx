interface HeaderProps {
  setSchema: (schema: unknown) => void;
}

function Header({ setSchema }: HeaderProps) {

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const data = JSON.parse(event.target.value);
      setSchema(data);
    } catch { }
  }

  return <header className="row">
    <h1>Avro Visualiser</h1>
    <textarea onChange={onChange}></textarea>
    <hr />
  </header>
}

export default Header;
