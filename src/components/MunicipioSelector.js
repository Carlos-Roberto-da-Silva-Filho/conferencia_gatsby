import React, { useState, useEffect } from "react"
import * as styles from "../styles/municipioSelector.module.css"

export default function MunicipioSelector() {
  const uf = 42 // Código IBGE 
  const [municipios, setMunicipios] = useState([])
  const [search, setSearch] = useState("")
  const [selecionado, setSelecionado] = useState(null)

  // Busca todos os municípios 
  useEffect(() => {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
      .then(res => res.json())
      .then(data => setMunicipios(data))
      .catch(err => console.error("Erro ao carregar municípios:", err))
  }, [])

  // Filtra a lista conforme a pesquisa
  const filteredMunicipios = municipios.filter(m =>
    m.nome.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🗺️ Selecione um município</h2>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Digite o nome do município..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={styles.input}
      />

      {/* Select de municípios */}
      <select
        value={selecionado ? selecionado.id : ""}
        onChange={e => {
          const mun = municipios.find(m => m.id === parseInt(e.target.value))
          setSelecionado(mun)
        }}
        className={styles.select}
      >
        <option value="">Selecione...</option>
        {filteredMunicipios.map(m => (
          <option key={m.id} value={m.id}>
            {m.nome}
          </option>
        ))}
      </select>

      {/* Exibe informações do município */}
      {selecionado && (
        <div className={styles.card}>
          <h3 className={styles.municipio}>{selecionado.nome}</h3>

          <ul className={styles.lista}>
            <li><strong>UF:</strong> {selecionado.microrregiao.mesorregiao.UF.sigla}</li>
            <li><strong>Estado:</strong> {selecionado.microrregiao.mesorregiao.UF.nome}</li>
            <li><strong>Região:</strong> {selecionado.microrregiao.mesorregiao.UF.regiao.nome}</li>
            <li><strong>Mesorregião:</strong> {selecionado.microrregiao.mesorregiao.nome}</li>
            <li><strong>Microrregião:</strong> {selecionado.microrregiao.nome}</li>
          </ul>

          {/* Mapa centralizado e arredondado */}
          <div className={styles.mapContainer}>
            <iframe
              title="Mapa do município"
              className={styles.map}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                `${selecionado.nome}, Santa Catarina`
              )}&output=embed`}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}
