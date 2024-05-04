import React, { useState, useEffect } from "react";

function DetailPlanFollowingTimeline(props) {
  const [state, setState] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  const [milestones, setMilestones] = useState([]);
  const [phases, setPhases] = useState([]);

  const handleAddMilestone = () => {
    const newMilestone = {
      date: "",
      content: "",
    };
    setMilestones([...milestones, newMilestone]);
  };

  const handleRemoveMilestone = (index) => {
    const updatedMilestones = [...milestones];
    updatedMilestones.splice(index, 1);
    setMilestones(updatedMilestones);
  };

  const handleAddPhase = () => {
    const newPhase = {
      fromDate: "",
      toDate: "",
      title: "",
      milestones: [],
    };
    setPhases([...phases, newPhase]);
  };

  const handleRemovePhase = (index) => {
    const updatedPhases = [...phases];
    updatedPhases.splice(index, 1);
    setPhases(updatedPhases);
  };

  const handleMilestoneChange = (event, index, fieldName) => {
    const { value } = event.target;
    const updatedMilestones = [...milestones];
    updatedMilestones[index][fieldName] = value;
    setMilestones(updatedMilestones);
  };

  const handlePhaseChange = (event, index, fieldName) => {
    const { value } = event.target;
    const updatedPhases = [...phases];
    updatedPhases[index][fieldName] = value;
    setPhases(updatedPhases);
  };

  const handleAddPhaseMilestone = (phaseIndex) => {
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].milestones.push({
      date: "",
      content: "",
    });
    setPhases(updatedPhases);
  };

  const handleRemovePhaseMilestone = (phaseIndex, milestoneIndex) => {
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].milestones.splice(milestoneIndex, 1);
    setPhases(updatedPhases);
  };

  const handlePhaseMilestoneChange = (
    event,
    phaseIndex,
    milestoneIndex,
    fieldName
  ) => {
    const { value } = event.target;
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].milestones[milestoneIndex][fieldName] = value;
    setPhases(updatedPhases);
  };

  const handleGetData = () => {
    console.log("Milestones:", milestones);
    console.log("Phases:", phases);
  };

  return (
    <>
      <div className="my-16 w-full">
        <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
          LỊCH TRÌNH TỪNG THỜI GIAN
        </h2>
        <div>
          {/* Render milestones */}
          {milestones.map((milestone, index) => (
            <div key={index} className="flex justify-between mt-2">
              <input
                type="date"
                value={milestone.date}
                onChange={(e) => handleMilestoneChange(e, index, "date")}
              />
              <label className="input input-bordered flex-grow ml-2">
                <input
                  type="text"
                  className="w-full"
                  placeholder="Nội dung"
                  value={milestone.content}
                  onChange={(e) => handleMilestoneChange(e, index, "content")}
                />
              </label>
              <button onClick={() => handleRemoveMilestone(index)}>Xóa</button>
            </div>
          ))}

          {/* Render phases */}
          {phases.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="flex flex-col ">
              <div className="w-full ">
                {/* Render phase info */}
                <div className="flex items-center relative">
                  <div className="bg-red-700 text-white w-12 h-12 text-center flex justify-center items-center ">
                    <span className="font-bold">{phaseIndex + 1}</span>
                  </div>
                  <span className="mx-2 font-bold">{`Giai đoạn ${phaseIndex + 1}`}</span>
                  <button
                    className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full"
                    onClick={() => handleRemovePhase(phaseIndex)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="flex-grow mr-4">
                    <p className="font-bold">Từ ngày</p>
                    <input
                      type="date"
                      className="w-full mt-1"
                      value={phase.fromDate}
                      onChange={(e) =>
                        handlePhaseChange(e, phaseIndex, "fromDate")
                      }
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold">Đến ngày</p>
                    <input
                      type="date"
                      className="w-full mt-1"
                      value={phase.toDate}
                      onChange={(e) =>
                        handlePhaseChange(e, phaseIndex, "toDate")
                      }
                    />
                  </div>
                </div>
                <div className="flex mt-4">
                  <p className="font-bold mr-16">Tiêu đề</p>
                  <label className="input input-bordered flex-grow ml-2">
                    <input
                      type="text"
                      className="w-full"
                      placeholder="Nội dung tiêu đề"
                      value={phase.title}
                      onChange={(e) =>
                        handlePhaseChange(e, phaseIndex, "title")
                      }
                    />
                  </label>{" "}
                </div>
                {phase.milestones.length > 0 && (
                  <div className="flex mt-4">
                    <p className="font-bold">Thời gian</p>
                    <p className="font-bold mx-20">Nội dung từng thời gian</p>
                  </div>
                )}
                {/* Render phase milestones */}
                {phase.milestones.map((milestone, milestoneIndex) => (
                  <div key={milestoneIndex} className="mt-4">
                    <div className="flex justify-between mt-2 relative">
                      <input
                        type="date"
                        value={milestone.date}
                        onChange={(e) =>
                          handlePhaseMilestoneChange(
                            e,
                            phaseIndex,
                            milestoneIndex,
                            "date"
                          )
                        }
                      />
                      <label className="input input-bordered flex-grow ml-2">
                        <input
                          type="text"
                          className="w-full"
                          placeholder="Nội dung"
                          value={milestone.content}
                          onChange={(e) =>
                            handlePhaseMilestoneChange(
                              e,
                              phaseIndex,
                              milestoneIndex,
                              "content"
                            )
                          }
                        />
                      </label>
                      <button
                        className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full"
                        onClick={() =>
                          handleRemovePhaseMilestone(phaseIndex, milestoneIndex)
                        }
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  className="btn bg-mainColor text-white rounded-lg my-4"
                  onClick={() => handleAddPhaseMilestone(phaseIndex)}
                >
                  Thêm mốc thời gian
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleAddPhase}
          className="btn bg-mainColor text-white rounded-lg mt-10"
        >
          Thêm giai đoạn
        </button>
        <button className=" mx-2 btn rounded-lg mt-4" onClick={handleGetData}>
          Log dữ liệu
        </button>
      </div>
    </>
  );
}

export default DetailPlanFollowingTimeline;
