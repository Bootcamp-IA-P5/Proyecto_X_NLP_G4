"""
Script para cargar y validar datasets para el proyecto de NLP.

Este módulo proporciona funciones para:
- Cargar datasets desde diferentes formatos
- Validar la estructura de los datos
- Realizar chequeos básicos de calidad
"""

import pandas as pd
from pathlib import Path
from typing import Tuple, Optional


class DataLoader:
    """Clase para cargar y validar datasets."""
    
    def __init__(self, data_dir: str = '../data/raw'):
        """
        Inicializa el cargador de datos.
        
        Args:
            data_dir: Ruta al directorio de datos
        """
        self.data_dir = Path(data_dir)
    
    def load_csv(self, filename: str, **kwargs) -> pd.DataFrame:
        """
        Carga un archivo CSV.
        
        Args:
            filename: Nombre del archivo CSV
            **kwargs: Argumentos adicionales para pd.read_csv
            
        Returns:
            DataFrame con los datos cargados
        """
        file_path = self.data_dir / filename
        if not file_path.exists():
            raise FileNotFoundError(f"Archivo no encontrado: {file_path}")
        
        df = pd.read_csv(file_path, **kwargs)
        print(f"✓ Archivo cargado: {filename}")
        print(f"  Dimensiones: {df.shape}")
        return df
    
    def validate_structure(self, df: pd.DataFrame, 
                          text_col: str = 'text',
                          label_col: str = 'label') -> Tuple[bool, list]:
        """
        Valida la estructura básica del dataset.
        
        Args:
            df: DataFrame a validar
            text_col: Nombre de la columna de texto
            label_col: Nombre de la columna de etiquetas
            
        Returns:
            Tupla (es_válido, lista_de_errores)
        """
        errors = []
        
        # Verificar columnas requeridas
        if text_col not in df.columns:
            errors.append(f"Columna '{text_col}' no encontrada")
        if label_col not in df.columns:
            errors.append(f"Columna '{label_col}' no encontrada")
        
        if errors:
            return False, errors
        
        # Verificar tipos de datos
        if df[text_col].dtype != 'object':
            errors.append(f"Columna '{text_col}' debe ser de tipo texto")
        
        # Verificar valores nulos
        null_text = df[text_col].isnull().sum()
        null_label = df[label_col].isnull().sum()
        
        if null_text > 0:
            errors.append(f"Se encontraron {null_text} valores nulos en '{text_col}'")
        if null_label > 0:
            errors.append(f"Se encontraron {null_label} valores nulos en '{label_col}'")
        
        # Verificar que haya datos
        if len(df) == 0:
            errors.append("El dataset está vacío")
        
        is_valid = len(errors) == 0
        return is_valid, errors
    
    def get_basic_info(self, df: pd.DataFrame) -> dict:
        """
        Obtiene información básica del dataset.
        
        Args:
            df: DataFrame a analizar
            
        Returns:
            Diccionario con información básica
        """
        return {
            'n_records': len(df),
            'n_columns': len(df.columns),
            'columns': df.columns.tolist(),
            'dtypes': df.dtypes.to_dict(),
            'missing_values': df.isnull().sum().to_dict(),
            'memory_usage': df.memory_usage(deep=True).sum() / 1024**2  # MB
        }
    
    def print_summary(self, df: pd.DataFrame, 
                     text_col: str = 'text',
                     label_col: str = 'label'):
        """
        Imprime un resumen del dataset.
        
        Args:
            df: DataFrame a resumir
            text_col: Nombre de la columna de texto
            label_col: Nombre de la columna de etiquetas
        """
        print("\n" + "="*60)
        print("RESUMEN DEL DATASET")
        print("="*60)
        
        # Información básica
        info = self.get_basic_info(df)
        print(f"\n📊 Registros: {info['n_records']}")
        print(f"📋 Columnas: {info['n_columns']}")
        print(f"💾 Uso de memoria: {info['memory_usage']:.2f} MB")
        
        # Validación
        is_valid, errors = self.validate_structure(df, text_col, label_col)
        print(f"\n✓ Estructura válida: {is_valid}")
        if errors:
            print("\n⚠️ Errores encontrados:")
            for error in errors:
                print(f"  - {error}")
        
        # Distribución de clases
        if label_col in df.columns:
            print(f"\n📈 Distribución de clases:")
            class_dist = df[label_col].value_counts()
            for label, count in class_dist.items():
                pct = (count / len(df)) * 100
                print(f"  Clase {label}: {count} ({pct:.2f}%)")
        
        # Estadísticas de texto
        if text_col in df.columns:
            print(f"\n📝 Estadísticas de texto:")
            text_lengths = df[text_col].str.len()
            print(f"  Longitud promedio: {text_lengths.mean():.2f} caracteres")
            print(f"  Longitud mínima: {text_lengths.min()} caracteres")
            print(f"  Longitud máxima: {text_lengths.max()} caracteres")
        
        print("="*60 + "\n")


def example_usage():
    """Ejemplo de uso del DataLoader."""
    # Crear instancia
    loader = DataLoader(data_dir='../data/raw')
    
    # Cargar datos
    # df = loader.load_csv('youtube_comments.csv')
    
    # Validar estructura
    # is_valid, errors = loader.validate_structure(df)
    
    # Mostrar resumen
    # loader.print_summary(df)
    
    print("Para usar este módulo:")
    print("1. Coloca tu dataset en data/raw/")
    print("2. Importa DataLoader desde este módulo")
    print("3. Carga y valida tus datos")


if __name__ == "__main__":
    example_usage()
