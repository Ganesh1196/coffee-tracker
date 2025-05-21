//There is a portal div created in the index.html
import { Children } from "react"
import ReactDom from "react-dom"
export default function Modal(props){

  const { children, handleCloseModal } = props

  return ReactDom.createPortal(
    <div className="modal-container">
      <button onClick={handleCloseModal} className="modal-underlay" /> {/** This is a drak area on the side of the modal which will be acting as a button and handleCloseModal will be invoked when clicked anywhere in that area */}
      <div className="modal-content">
          {children}
      </div>
    </div>,
    document.getElementById("portal") //this is defined in index.html
  )
}