import React from "react";
import './SelectTour.scss';
import { ButtonChange } from "../../utils/components";

const SelectTour = () => {
    return (
       <section className="select_tour_header">
        <img src="" alt="" />
        <div className="st_text">
            <p className="">Name</p>
            <p className="">Duration</p>
            <p className="">Description</p>
        </div>
        <div className="st_change">
            <ButtonChange text={"refuse"} onClick={handleRefuse} />
            <ButtonChange text={"done"} onClick={handleDone} />
            <ButtonChange text={"reserve"} onClick={handleReserve} />
        </div>
       </section>

    );
}

export default SelectTour;