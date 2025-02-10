import { useState } from "react";
import { Button, Drawer, Modal, Input, message } from "antd";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

function Meeting() {
    const [meetings, setMeetings] = useState([
        { id: 1, date: "2025-02-03", author: "John Doe", title: "Weekly Sync", concept: "Discussion on project updates and team progress." },
        { id: 2, date: "2025-02-10", author: "Jane Smith", title: "Product Planning", concept: "Brainstorming session for new product features." }
    ]);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newMeeting, setNewMeeting] = useState({ date: "", author: "", title: "", concept: "" });
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedMeeting, setEditedMeeting] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [cancelConfirm, setCancelConfirm] = useState(false);

    const addMeeting = () => {
        if (!newMeeting.title || !newMeeting.author || !newMeeting.date || !newMeeting.concept) {
            message.error("All fields are required!");
            return;
        }
        setMeetings([...meetings, { id: meetings.length + 1, ...newMeeting }]);
        setShowModal(false);
        setNewMeeting({ date: "", author: "", title: "", concept: "" });
    };

    const deleteMeeting = () => {
        setMeetings(meetings.filter(meeting => meeting.id !== selectedMeeting.id));
        setDrawerOpen(false);
        setDeleteConfirm(false);
    };

    const openDrawer = (meeting) => {
        setSelectedMeeting(meeting);
        setEditedMeeting(meeting);
        setIsEditing(false);
        setDrawerOpen(true);
    };

    const saveEditedMeeting = () => {
        if (!editedMeeting.title || !editedMeeting.author || !editedMeeting.date || !editedMeeting.concept) {
            message.error("All fields are required!");
            return;
        }
        setMeetings(meetings.map(meeting => meeting.id === editedMeeting.id ? editedMeeting : meeting));
        setSelectedMeeting(editedMeeting);
        setIsEditing(false);
    };

    return (
        <div>
            <Header />
            <div style={{ padding: "24px", display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
                {meetings.map((meeting) => (
                    <div
                        key={meeting.id}
                        style={{
                            backgroundColor: "white",
                            border: "1px solid #ddd",
                            padding: "16px",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            cursor: "pointer",
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                            maxWidth: "100%"
                        }}
                        onClick={() => openDrawer(meeting)}
                    >
                        <h2 style={{ wordWrap: "break-word", whiteSpace: "normal", maxWidth: "100%" }}>{meeting.title}</h2>
                        <p style={{ wordWrap: "break-word", whiteSpace: "normal", maxWidth: "100%" }}>{meeting.date} - {meeting.author}</p>
                    </div>
                ))}
            </div>
            <Button type="primary" style={{ position: "fixed", bottom: "24px", right: "24px" }} onClick={() => { setShowModal(true); setNewMeeting({ date: "", author: "", title: "", concept: "" }); }}>New Meeting</Button>

            <Drawer title="Meeting Details" onClose={() => setDrawerOpen(false)} open={drawerOpen} width={500}>
                {selectedMeeting && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {isEditing ? (
                            <>
                                <Input value={editedMeeting.title} onChange={(e) => setEditedMeeting({ ...editedMeeting, title: e.target.value })}
                                    style={{ wordWrap: "break-word", whiteSpace: "normal", maxWidth: "100%" }} />
                                <Input value={editedMeeting.author} onChange={(e) => setEditedMeeting({ ...editedMeeting, author: e.target.value })}
                                    style={{ wordWrap: "break-word", whiteSpace: "normal", maxWidth: "100%" }} />
                                <Input type="date" value={editedMeeting.date} onChange={(e) => setEditedMeeting({ ...editedMeeting, date: e.target.value })} />
                                <Input.TextArea value={editedMeeting.concept} rows={6}
                                    style={{ wordWrap: "break-word", whiteSpace: "pre-wrap", resize: "none", maxWidth: "100%" }}
                                    onChange={(e) => setEditedMeeting({ ...editedMeeting, concept: e.target.value })} />
                                <Button type="primary" onClick={saveEditedMeeting}>Save</Button>
                                <Button type="default" onClick={() => setIsEditing(false)}>Cancel</Button>
                            </>
                        ) : (
                            <>
                                <h2 style={{ wordWrap: "break-word", whiteSpace: "normal", maxWidth: "100%" }}>{selectedMeeting.title}</h2>
                                <p><strong>Date:</strong> {selectedMeeting.date}</p>
                                <p><strong>Author:</strong> {selectedMeeting.author}</p>
                                <p><strong>Concept:</strong></p>
                                <div style={{ wordWrap: "break-word", whiteSpace: "pre-wrap", maxWidth: "100%" }}>{selectedMeeting.concept}</div>
                                <Button type="primary" onClick={() => setIsEditing(true)}>Edit</Button>
                                <Button type="danger" onClick={() => setDeleteConfirm(true)}>Delete</Button>
                            </>
                        )}
                    </div>
                )}
            </Drawer>

            <Modal title="Confirm Delete" open={deleteConfirm} onOk={deleteMeeting} onCancel={() => setDeleteConfirm(false)}>
                <p>Are you sure you want to delete this meeting?</p>
            </Modal>

            <Modal title="Confirm Cancel" open={cancelConfirm} onOk={() => { setShowModal(false); setCancelConfirm(false); }} onCancel={() => setCancelConfirm(false)}>
                <p>Are you sure you want to cancel?</p>
            </Modal>

            <Modal title="New Meeting" open={showModal} onCancel={() => setCancelConfirm(true)} onOk={addMeeting} centered width={500} maskClosable={false}>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <Input placeholder="Title" value={newMeeting.title}
                        onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                        style={{ wordWrap: "break-word", whiteSpace: "normal", maxWidth: "100%" }} />
                    <Input placeholder="Author" value={newMeeting.author}
                        onChange={(e) => setNewMeeting({ ...newMeeting, author: e.target.value })}
                        style={{ wordWrap: "break-word", whiteSpace: "normal", maxWidth: "100%" }} />
                    <Input type="date" value={newMeeting.date} onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })} />
                    <Input.TextArea placeholder="Concept" rows={6}
                        style={{ wordWrap: "break-word", whiteSpace: "pre-wrap", maxWidth: "100%" }}
                        value={newMeeting.concept}
                        onChange={(e) => setNewMeeting({ ...newMeeting, concept: e.target.value })} />
                </div>
            </Modal>
            <Footer />
        </div>
    );
}

export default Meeting;
