import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import * as styles from "../styles/local_evento.module.css"

const geocodeWithNominatim = async (place) => {
  const q = encodeURIComponent(place)
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${q}&limit=1`
  const res = await fetch(url, {
    headers: {
      "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
    },
  })
  if (!res.ok) throw new Error("Erro no geocoding")
  const arr = await res.json()
  if (!arr || arr.length === 0) throw new Error("Coordenadas não encontradas")
  return { lat: parseFloat(arr[0].lat), lon: parseFloat(arr[0].lon) }
}

const LocalEvento = () => {
  const [municipio, setMunicipio] = useState("tijucas")
  const [dados, setDados] = useState(null)
  const [erro, setErro] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [coords, setCoords] = useState(null) 

  useEffect(() => {
    if (!municipio) return

    const fetchDados = async () => {
      setCarregando(true)
      setErro(null)
      setCoords(null)
      try {
        // 1) dados IBGE
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${municipio.toLowerCase()}`
        )
        if (!response.ok) throw new Error("Município não encontrado (IBGE)")
        const data = await response.json()
        setDados(data)

        // 2) geocode via Nominatim (OpenStreetMap)
        // montar texto: "Cidade, Estado, Brasil" — melhora acurácia
        const place = `${data.nome}, ${data.microrregiao.mesorregiao.UF.nome}, Brasil`
        try {
          const g = await geocodeWithNominatim(place)
          setCoords(g)
        } catch (gErr) {
          // se Nominatim falhar, tentar com apenas "cidade, Brasil"
          try {
            const g2 = await geocodeWithNominatim(`${data.nome}, Brasil`)
            setCoords(g2)
          } catch (gErr2) {
            // não encontrou coordenadas — apenas reporta, mas mantemos dados
            console.warn("Geocoding falhou:", gErr, gErr2)
            setCoords(null)
          }
        }
      } catch (err) {
        setErro(err.message)
        setDados(null)
        setCoords(null)
      } finally {
        setCarregando(false)
      }
    }

    fetchDados()
  }, [municipio])

  const handleSubmit = (e) => {
    e.preventDefault()
    const novoMunicipio = e.target.elements.municipio.value.trim().toLowerCase()
    if (novoMunicipio) setMunicipio(novoMunicipio)
  }

  return (
    <Layout>
      <main className={styles.container}>
        <h1 className={styles.title}>📍 Local do Evento</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            id="municipio"
            name="municipio"
            placeholder="Digite o município... (ex: florianopolis)"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Buscar</button>
        </form>

        {carregando && <p>Carregando dados...</p>}
        {erro && <p className={styles.error}>⚠️ {erro}</p>}

        {dados && (
          <div className={styles.card}>
            <h2 className={styles.municipio}>{dados.nome}</h2>
            <ul className={styles.lista}>
              <li><strong>UF:</strong> {dados.microrregiao.mesorregiao.UF.sigla}</li>
              <li><strong>Estado:</strong> {dados.microrregiao.mesorregiao.UF.nome}</li>
              <li><strong>Região:</strong> {dados.microrregiao.mesorregiao.UF.regiao.nome}</li>
              <li><strong>Mesorregião:</strong> {dados.microrregiao.mesorregiao.nome}</li>
              <li><strong>Microrregião:</strong> {dados.microrregiao.nome}</li>
            </ul>

            {/* Renderizar o mapa apenas se tivermos coords */}
            {coords ? (
              <div className={styles.mapContainer}>
                {/* OpenStreetMap embed (sem chave) com marcador.
                    Calculaum bbox pequeno ao redor das coords. */}
                {(() => {
                  const lat = coords.lat
                  const lon = coords.lon
                  const delta = 0.06 // ajusta zoom; menor = mais zoom
                  const left = lon - delta
                  const right = lon + delta
                  const top = lat + delta
                  const bottom = lat - delta
                  const bbox = `${left},${bottom},${right},${top}`
                  // url do embed OSM com marker
                  const osmSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`
                  // link para abrir direto no OSM (fora do iframe)
                  const osmLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=12/${lat}/${lon}`
                  return (
                    <>
                      <iframe
                        title="Mapa do município - OpenStreetMap"
                        src={osmSrc}
                        className={styles.map}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                      <p style={{ textAlign: "center", marginTop: "0.5rem", fontSize: "0.9rem" }}>
                        <a href={osmLink} target="_blank" rel="noopener noreferrer">
                          Abrir mapa em nova aba
                        </a>
                      </p>
                    </>
                  )
                })()}
              </div>
            ) : (
              <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
                Mapa indisponível para este município.
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
