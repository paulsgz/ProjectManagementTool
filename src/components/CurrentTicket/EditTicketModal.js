import Modal from 'react-modal';

const EditTicketModal = ({
  showModal,
  closeModal,
  saveEdit,
  description,
  setDescription,
  developer,
  setDeveloper,
  priority,
  setPriority,
  status,
  setStatus,
  developersList,
}) => {
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      contentLabel="Edit Ticket"
    >
      <h4>Edit Ticket</h4>
      <form className="addForm" onSubmit={saveEdit}>
        <label>
          Description
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Description of Ticket..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            autoComplete="off"
          />
        </label>
        <label>
          Assign To
          <select
            id="developers"
            name="developer"
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
            required
          >
            <option value="" disabled>
              Choose a developer
            </option>
            {developersList.map((developer, index) => (
              <option key={index} value={developer}>
                {developer}
              </option>
            ))}
          </select>
        </label>
        <label>
          Priority
          <select
            name="priority"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="" disabled>
              Choose a priority
            </option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </label>
        <label>
          Status
          <select
            name="status"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="" disabled>
              Choose a status
            </option>
            <option value="To do">To do</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Finished">Finished</option>
          </select>
        </label>
        <button type="submit" className="create">
          Create
        </button>
      </form>
    </Modal>
  );
};

export default EditTicketModal;
