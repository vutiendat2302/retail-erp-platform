import React, {useState} from "react"

export const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6 max-w-screen-2xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-muted-foreground">
                © 2024 WareHouse Pro. Tất cả quyền được bảo lưu.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="support" className="text-sm text-muted-foreground hover:text-foreground">
                Hỗ trợ
              </a>
              <a href="dieu-khoan" className="text-sm text-muted-foreground hover:text-foreground">
                Điều khoản
              </a>
            </div>
          </div>
        </div>
    </footer>
  );
}