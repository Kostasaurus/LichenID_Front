import {CollectionStats} from './CollectionStats.jsx'
import {CollectionTable} from './CollectionTable.jsx'
import {SampleForm} from './SampleForm'
import {ModalWindow} from './ModalWindow.jsx'


import {useCollection} from '../../hooks/useCollection.js'
import SampleShow from './SampleShow.jsx'


export default function Collection() {
	
		const {
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
			
			selectedPhoto,
			setSelectedPhoto,
			
			handleAddInputChange,
			handleSubmit,
			handleEdit,
			handleEditChange,
			handleSaveEdit,
			removeSample,
		} = useCollection();
		
	
	return (
			<section id="collection" className="mb-20">
				<div className="mb-10">
					<h2 className="text-3xl font-bold mb-4">
						<span className="text-gradient">Моя коллекция</span>
					</h2>
					<p className="  max-w-3xl">
						Ведите учет собранных образцов с фотографиями, локациями и метаданными.
					</p>
				</div>
				
				<CollectionStats
					metadata={collection.metadata}
					onAddClick={() => setIsModalAddOpen(true)}
				/>
				
				<ModalWindow
					isOpen={isModalAddOpen}
				>
					
					<SampleForm
						mode="add"
						formData={newSample}
						onChange={handleAddInputChange}
						onSubmit={handleSubmit}
						onCancel={() => handleCancel()}
						title="Добавить образец"
						selectedPhoto={selectedPhoto}
						setSelectedPhoto={setSelectedPhoto}
					/>
				</ModalWindow>
				
				
				<ModalWindow
					isOpen={!!editingSample}
				>
					<SampleForm
						mode="edit"
						formData={editForm}
						onChange={handleEditChange}
						onSubmit={handleSaveEdit}
						onCancel={() => setEditingSample(null)}
						title="Редактировать образец"
						selectedPhoto={selectedPhoto}
						setSelectedPhoto={setSelectedPhoto}
					/>
				</ModalWindow>
				
				<ModalWindow
					isOpen={!!showingSample}
				>
					
					<SampleShow
						onCancel={() => setShowingSample(null)}
					sample={showingSample}>
				</SampleShow></ModalWindow>
				
				<CollectionTable
					samples={collection.samples}
					onView={setShowingSample}
					onEdit={handleEdit}
					onDelete={removeSample}
				/>
			</section>
		)
	
}