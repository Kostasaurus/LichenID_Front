import {useContext, useEffect, useState} from 'react'
import {userContext} from "../contexts/contextProvider.js"
import defaultCollection from "../assets/defaultCollection/defaultCollection.json"
import api from "../api/apiClient.jsx"

export const useCollection = () => {
	
	const {
		userData,
	} = useContext(userContext);
	
	const [collection, setCollection] = useState(defaultCollection);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	
	
	const [selectedPhoto, setSelectedPhoto] = useState(null);
	const [uploading, setUploading] = useState(false);

	const uploadPhotoToServer = async (file) => {
		setUploading(true);
		try {
			const result = await api.uploadPhoto(file);
			return result.filename;
		} catch (err) {
			console.error('Ошибка загрузки фото:', err);
			throw err;
		} finally {
			setUploading(false);
		}
	};
	
	
	const saveCollectionToServer = async (updatedCollection) => {
		if (!userData) return;
		try {
			await api.updateCollection(updatedCollection);
		} catch (err) {
			console.error('Ошибка сохранения коллекции:', err);
			setError(err.message || 'Ошибка сохранения');
		}
	};
	
	
	useEffect(() => {
		const loadCollection = async () => {
			if (!userData) {
				setCollection(defaultCollection);
				return;
			}
			setLoading(true);
			setError(null);
			try {
				const data = await api.getCollection();
				const userCollection = await data.json()
				console.log(userCollection)
				userCollection ? setCollection(userCollection) : setCollection(defaultCollection);
			}
			
		catch (err) {
				setError(err.message || 'Ошибка загрузки коллекции');
				console.error(err);
				setCollection(defaultCollection);
			}
			finally {
				setLoading(false);
			}
		}
		
		loadCollection();
		
	}, [userData]);
	
	
	const [isModalAddOpen, setIsModalAddOpen] = useState(false);
	const [editingSample, setEditingSample] = useState(null);
	const [showingSample, setShowingSample] = useState(null);
	
	
	const emptySample = {
		name: "",
		id: "",
		scientificName: "",
		commonName: "",
		collectionDate: "",
		collectionDateFormatted: "",
		location: "",
		habitat: "",
		status: "",
		description: "",
		substrate: "",
		determinationDate: "",
		notes: "",
		photos: []
	};
	
	const [newSample, setNewSample] = useState({ ...emptySample });
	const [editForm, setEditForm] = useState({ ...emptySample });
	
	useEffect(() => {
		if (isModalAddOpen || editingSample || showingSample) {
			document.body.style.overflow = 'hidden';
			document.body.style.height = '100vh';
		} else {
			document.body.style.overflow = '';
			document.body.style.height = '';
		}
		
		return () => {
			document.body.style.overflow = '';
			document.body.style.height = '';
		};
	}, [isModalAddOpen, editingSample, showingSample]);
	
	
	const handleAddInputChange = (e) => {
		const { name, value } = (e.target ? e.target : {name: "status", value: e.value});
		setNewSample(prev => ({ ...prev, [name]: value }));
	};
	
	const computeMetadata = (samples) => {
		const uniqueSpecies = [...new Set(samples.map(item => item.scientificName))].length;
		const uniqueGenera = [...new Set(samples.map(item => item.scientificName.split(' ')[0]))].length;
		
		return {
			totalSamples: samples.length,
			totalSpecies: uniqueSpecies,
			totalGenera: uniqueGenera
		};
	};
	
	const updateCollection = async (newSamples, skipSave = false) => {
		const metadata = computeMetadata(newSamples);
		const updatedCollection = { samples: newSamples, metadata };
		
		setCollection(updatedCollection);
		
		if (!skipSave && userData) {
			await saveCollectionToServer(updatedCollection);
		}
	};
	
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		
		const newId = `LF-${crypto.randomUUID()}`;
		
		let photoFilename = null
		
		if (selectedPhoto) {
			photoFilename = selectedPhoto.name
			try {
				await uploadPhotoToServer(selectedPhoto);
			} catch (err) {
				alert('Не удалось загрузить фото');
				return;
			}
		}
		
		const sampleToAdd = {
			...newSample,
			id: newId,
			collectionDateFormatted: new Date(newSample.collectionDate).toLocaleDateString('ru-RU'),
			photos: photoFilename ? [photoFilename] : []
		};
		
		const updatedSamples = [...collection.samples, sampleToAdd];
		
		await updateCollection(updatedSamples)
		
		setIsModalAddOpen(false);
		setNewSample({ ...emptySample });
		setSelectedPhoto(null)
	};
	
	const handleEdit = (sample) => {
		setEditingSample(sample);
		setEditForm({ ...sample });
	};
	
	const handleEditChange = (e) => {
		const { name, value } = (e.target ? e.target : {name: "status", value: e.value});
		setEditForm(prev => ({ ...prev, [name]: value }));
	};
	
	const handleSaveEdit = async (e) => {
		e.preventDefault();
		
		const updatedSamples = collection.samples.map(sample =>
			sample.id === editingSample.id ? { ...editForm } : sample
		);
		
		await updateCollection(updatedSamples)
		
		setEditingSample(null);
		setEditForm({ ...emptySample });
	};
	
	const removeSample = (id) => {
		const updatedSamples = collection.samples.filter((item) => item.id !== id);
		
		updateCollection(updatedSamples)
		
	};
	
	const handleCancel = () => {
		setIsModalAddOpen(false)
		setSelectedPhoto(null)
		setEditingSample(null)
		setShowingSample(null)
		setEditForm({...emptySample})
		setNewSample({...emptySample})
	}
	
	return {
		collection,
		emptySample,
		handleCancel,
		
		isModalAddOpen,
		setIsModalAddOpen,
		
		editingSample,
		setEditingSample,
		
		showingSample,
		setShowingSample,
		
		newSample,
		setNewSample,
		
		editForm,
		setEditForm,
		
		error,
		loading,
		
		selectedPhoto,
		setSelectedPhoto,
		
		handleAddInputChange,
		handleSubmit,
		handleEdit,
		handleEditChange,
		handleSaveEdit,
		removeSample,
	};
};