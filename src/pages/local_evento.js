import React, { useState, useCallback } from "react"
import Layout from "../components/Layout"
import MunicipioSelector from "../components/MunicipioSelector"
import * as styles from "../styles/local_evento.module.css"

const LocalEvento = () => {
    // Estado que armazena o nome completo para a busca no mapa
    const [mapSearchTerm, setMapSearchTerm] = useState(null)
    // Estado que armazena os dados do município para exibição
    const [municipioDados, setMunicipioDados] = useState(null) 

    // Função de callback passada para o componente filho (MunicipioSelector)
    const handleMunicipioSelect = useCallback((fullSearchTerm, dados) => {
        setMapSearchTerm(fullSearchTerm)
        setMunicipioDados(dados)
    }, [])

    // A URL do Google Maps é codificada com o termo de busca completo
    const googleMapSrc = mapSearchTerm 
        // O encodeURIComponent é CRUCIAL para tratar espaços e acentos na URL
        ? `https://maps.google.com/maps?q=${encodeURIComponent(mapSearchTerm)}&output=embed`
        : null

    return (
        <Layout>
            <main className={styles.container}>
                <h1 className={styles.title}>Local do Evento</h1>
                
                {/* Renderiza o componente seletor */}
                <MunicipioSelector onSelect={handleMunicipioSelect} />

                {municipioDados && (
                    <div className={styles.card}>
                        <h2 className={styles.municipio}>{municipioDados.nome}</h2>
                        
                        <ul className={styles.lista}>
                            <li><strong>UF:</strong> {municipioDados.uf}</li>
                            <li><strong>Região:</strong> {municipioDados.regiao}</li>
                        </ul>
                        
                        {googleMapSrc ? (
                            <div className={styles.mapContainer}>
                                <iframe
                                    title={`Mapa de ${municipioDados.nome}`}
                                    src={googleMapSrc}
                                    className={styles.map}
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        ) : (
                            <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
                                Selecione um estado e um município.
                            </p>
                        )}
                    </div>
                )}
            </main>
        </Layout>
    )
}

export default LocalEvento

export const Head = () => <title>Local do Evento - Conferência Tech</title>