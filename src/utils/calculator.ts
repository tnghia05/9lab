export type BmiResult = { value: string; category: string; advice: string; color: string };

export function calculateBmi(weight: number, heightCm: number): BmiResult {
  const bmi = weight / ((heightCm / 100) ** 2);
  if (bmi < 18.5) {
    return { value: bmi.toFixed(1), category: 'THIẾU CÂN', advice: 'Bạn có thể cần bổ sung dinh dưỡng và trao đổi với chuyên gia để xây dựng kế hoạch tăng cân phù hợp.', color: '#39B9E8' };
  }
  if (bmi < 25) {
    return { value: bmi.toFixed(1), category: 'BÌNH THƯỜNG', advice: 'Bạn đang có chỉ số BMI khỏe mạnh. Hãy tiếp tục duy trì chế độ ăn uống cân bằng và vận động đều đặn.', color: '#25D39A' };
  }
  return { value: bmi.toFixed(1), category: 'THỪA CÂN', advice: 'Hãy cân nhắc vận động thường xuyên và lựa chọn chế độ ăn cân bằng để chăm sóc sức khỏe.', color: '#FF9F43' };
}
