export default function Wrapper({ children }: any) {

  return (
    <>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-four-fifths">{children}</div>
        </div>
      </div>
    </>
  )
}