import React, { useState, useEffect, useCallback } from "react"
import * as styles from "../styles/municipioSelector.module.css" 

/**
 * Componente para seleção de Estado e Município usando a API do IBGE.
 * * @param {function} onSelect - Função de callback chamada ao selecionar um município.
 * Recebe (nomeCompletoParaMapa, dadosDetalhes).
 */
export default function MunicipioSelector({ onSelect }) {
    const [estados, setEstados] = useState([])
    const [municipios, setMunicipios] = useState([])
    const [ufSelecionada, setUfSelecionada] = useState("")
    const [municipioSelecionadoId, setMunicipioSelecionadoId] = useState("")
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState(null)

    //1) Carrega a lista de todos os estados do Brasil ao montar
    useEffect(() => {
        setCarregando(true)
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`)
            .then(res => res.json())
            .then(data => {
                setEstados(data)
                setErro(null)
            })
            .catch(err => {
                console.error("Erro ao carregar estados:", err)
                setErro("Erro ao carregar estados do IBGE.")
            })
            .finally(() => setCarregando(false))
    }, [])

    // 2) Carrega os municípios quando um estado é selecionado
    useEffect(() => {
        if (!ufSelecionada) {
            setMunicipios([])
            setMunicipioSelecionadoId("")
            return
        }

        setCarregando(true)
        setMunicipioSelecionadoId("")
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelecionada}/municipios`)
            .then(res => res.json())
            .then(data => {
                setMunicipios(data)
                setErro(null)
            })
            .catch(err => {
                console.error(`Erro ao carregar municípios de ${ufSelecionada}:`, err)
                setErro(`Erro ao carregar municípios do estado selecionado.`)
            })
            .finally(() => setCarregando(false))
    }, [ufSelecionada])
    
    // 3) Dispara o callback para a página pai
    const handleSelectChange = useCallback((municipioId) => {
        setMunicipioSelecionadoId(municipioId);
        
        if (municipioId) {
            const munObj = municipios.find(m => m.id === parseInt(municipioId));
            const ufObj = estados.find(e => e.id === parseInt(ufSelecionada));

            if (munObj && ufObj) {
                // Termo exato e oficial para busca no mapa (ex: "Rio de Janeiro, RJ, Brasil")
                const nomeCompleto = `${munObj.nome}, ${ufObj.sigla}, Brasil`;
                
                // Dados detalhados para exibição
                const dadosDetalhes = { 
                    nome: munObj.nome, 
                    uf: ufObj.sigla, 
                    regiao: ufObj.regiao.nome 
                };

                onSelect(nomeCompleto, dadosDetalhes);
                return;
            }
        }
        
        // Se nada ou seleção incompleta, envia nulo
        onSelect(null, null);

    }, [municipios, estados, ufSelecionada, onSelect]);


    const handleUfChange = (e) => {
        setUfSelecionada(e.target.value)
        // Disparar o onSelect(null, null) para limpar o mapa quando o estado muda
        onSelect(null, null); 
    }
    
    return (
        <div className={styles.container}>

            <p style={{ 
                textAlign: 'center', 
                marginBottom: '1rem', 
                padding: '10px', 
                backgroundColor: '#e4f6faff',
                borderRadius: '6px',
                borderLeft: '4px solid #288fd4ff'
            }}>
                O evento principal ocorre em Tijucas, Santa Catarina. 
                Selecione o estado e o município para visualizar o local exato no mapa.
            </p>
            <br />
            <h2 className={styles.title}>🗺️ Local do Evento (Seleção Oficial IBGE)</h2>
            
            {erro && <p style={{ color: 'red' }}>⚠️ {erro}</p>}
            
            <div className={styles.selectGroup}>
                {/* 1. Seletor de Estado (UF) */}
                <select
                    value={ufSelecionada}
                    onChange={handleUfChange}
                    className={styles.select}
                    disabled={carregando && estados.length === 0}
                >
                    <option value="">Selecione o Estado</option>
                    {estados.map(estado => (
                        <option key={estado.id} value={estado.id}>
                            {estado.nome} ({estado.sigla})
                        </option>
                    ))}
                </select>

                {/* 2. Seletor de Município */}
                <select
                    value={municipioSelecionadoId}
                    onChange={(e) => handleSelectChange(e.target.value)}
                    className={styles.select}
                    disabled={!ufSelecionada || carregando || municipios.length === 0}
                >
                    <option value="">
                        {municipios.length === 0 && ufSelecionada ? "Carregando municípios..." : "Selecione o Município"}
                    </option>
                    {municipios.map(municipio => (
                        <option key={municipio.id} value={municipio.id}>
                            {municipio.nome}
                        </option>
                    ))}
                </select>
            </div>

            {carregando && <p>Carregando dados...</p>}
        </div>
    )
}