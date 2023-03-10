const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { Services } from "./views/services.jsx"
import { Team } from "./views/team.jsx"
import { MailDetails } from "./apps/mail/views/mail-details.jsx"
import { UserMsg } from "./cmps/user-msg.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<About />} path="/about" />
                <Route element={<MailIndex />} path="/mail" />
                <Route element={<MailDetails />} path="/mail/:mailId" />

                <Route element={<NoteIndex />} path="/note" />
                <Route element={<NoteIndex />} path="/note/:noteId" />
            </Routes>
            <UserMsg />
        </section>
    </Router >
}
