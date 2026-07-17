import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Dashboard from "./Dashboard";
import TopicViewer from "./TopicViewer";
import MockTestEngine from "./MockTestEngine";

export default function PreparationGuideRoot() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="topic/:categoryId/:topicId" element={<TopicViewer />} />
        <Route path="mock-test" element={<MockTestEngine />} />
      </Route>
    </Routes>
  );
}
