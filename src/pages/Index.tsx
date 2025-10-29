import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [text, setText] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (text.trim()) {
      generateQRCode(text);
    } else {
      setQrDataUrl('');
    }
  }, [text]);

  const generateQRCode = async (value: string) => {
    try {
      const url = await QRCode.toDataURL(value, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrDataUrl(url);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  const downloadQRCode = () => {
    if (!qrDataUrl) return;

    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light tracking-tight text-black mb-4">
            QR Generator
          </h1>
          <p className="text-lg text-gray-500 font-light">
            Введите текст или URL для создания QR-кода
          </p>
        </div>

        <Card className="p-8 shadow-sm border-gray-200 animate-scale-in">
          <div className="space-y-8">
            <div>
              <label htmlFor="qr-input" className="block text-sm font-medium text-gray-700 mb-3">
                Текст или URL
              </label>
              <Input
                id="qr-input"
                type="text"
                placeholder="https://example.com"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="h-12 text-base border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>

            {qrDataUrl && (
              <div className="flex flex-col items-center space-y-6 animate-fade-in">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <img
                    src={qrDataUrl}
                    alt="Generated QR Code"
                    className="w-[300px] h-[300px]"
                  />
                </div>

                <Button
                  onClick={downloadQRCode}
                  className="w-full sm:w-auto h-12 px-8 text-base font-medium bg-primary hover:bg-primary/90 transition-all"
                >
                  <Icon name="Download" size={20} className="mr-2" />
                  Скачать QR-код
                </Button>
              </div>
            )}

            {!text && (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Icon name="QrCode" size={64} className="mb-4 opacity-50" />
                <p className="text-sm font-light">QR-код появится здесь</p>
              </div>
            )}
          </div>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-400 font-light">
          Создано с помощью poehali.dev
        </div>
      </div>
    </div>
  );
};

export default Index;
