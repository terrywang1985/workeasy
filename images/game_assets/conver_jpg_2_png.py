from PIL import Image
import os

def batch_convert_jpeg_to_png(input_dir, output_dir=None):
    """
    批量转换目录中的所有 JPEG 文件为 PNG 格式
    
    参数:
        input_dir: 输入目录路径
        output_dir: 输出目录路径（可选，默认为输入目录）
    """
    if output_dir is None:
        output_dir = input_dir
    
    # 确保输出目录存在
    os.makedirs(output_dir, exist_ok=True)
    
    # 支持的 JPEG 扩展名
    jpeg_extensions = ['.jpg', '.jpeg', '.JPG', '.JPEG']
    
    converted_count = 0
    
    for filename in os.listdir(input_dir):
        # 检查文件扩展名
        if any(filename.lower().endswith(ext) for ext in ['.jpg', '.jpeg']):
            input_path = os.path.join(input_dir, filename)
            
            # 生成输出文件名
            name_without_ext = os.path.splitext(filename)[0]
            output_filename = name_without_ext + '.png'
            output_path = os.path.join(output_dir, output_filename)
            
            try:
                # 转换文件
                with Image.open(input_path) as img:
                    if img.mode != 'RGB':
                        img = img.convert('RGB')
                    img.save(output_path, 'PNG')
                    print(f"转换成功: {filename} -> {output_filename}")
                    converted_count += 1
                    
            except Exception as e:
                print(f"转换失败 {filename}: {e}")
    
    print(f"批量转换完成！共转换 {converted_count} 个文件")

# 使用示例
if __name__ == "__main__":
    # 批量转换目录中的所有 JPEG 文件
    batch_convert_jpeg_to_png('.', './converted_images')