import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import NewCampaignPage from "../../pages/NewCampaignPage/NewCampaignPage";
import CampaignPage from '../CampaignPage/CampaignPage';
import HomePage from '../HomePage/HomePage';
import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import * as campaignsAPI from '../../utilities/campaigns-api';
import EditCampaignPage from '../EditCampaignPage/EditCampaignPage';

export default function App() {
  const [user, setUser] = useState(getUser())
  const [campaigns, setCampaigns] = useState([])

  async function editCampaign(campaignId, updatedCampaign) {
    const newCampaign = await campaignsAPI.editItem(campaignId, updatedCampaign)
    setCampaigns(campaigns => campaigns.map(campaign => campaign._id === campaignId ? newCampaign : campaign))
  }

  async function deleteCampaign(campaignId) {
    await campaignsAPI.deleteItem(campaignId)
    setCampaigns(campaigns => campaigns.filter(campaign => campaign._id !== campaignId))
  }
  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<HomePage campaigns={campaigns} setCampaigns={setCampaigns} />} />
            <Route path="/campaigns/new" element={<NewCampaignPage campaigns={campaigns} setCampaigns={setCampaigns} />} />
            <Route path="/campaigns/:id" element={<CampaignPage deleteCampaign={deleteCampaign} />} />
            <Route path="/campaigns/:id/edit" element={<EditCampaignPage editCampaign={editCampaign} />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
