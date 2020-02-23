import {getListProduct ,
        deleteProduct ,
        getProductById , 
        updateProduct , 
        addProduct ,
        callApi } from "./utils/callapi.js";
import SanPham from "./models/SanPham.js";
//arrow function
const renderHTML = () => {
    let contentHTML = `
        <div class="card text-white bg-dark">
        <div class="card-body">
        <h4 class="card-title">Danh sách sản phẩm</h4>
        <div class='container'>
            <div class="row">
            <div class="col-md-3">
                <input id="maSP" class="form-control" placeholder="Mã SP" disabled />
            </div>
            <div class="col-md-3">
                <input id="tenSP" class="form-control" placeholder="Tên SP" />
            </div>
            <div class="col-md-3">
                <input id="gia" class="form-control" placeholder="Giá" />
            </div>
            <div class="col-md-3">
                <input id="hinhAnh" class="form-control" placeholder="Link hình" />
            </div>
            </div>
            <br />
            <button id="btnThem" class="btn btn-success">Thêm sản phẩm</button>
            <button id="btnCapNhat" class="btn btn-success">Cap nhat</button>
        </div>
        </div>
    </div>
    <div class="container">
        <table class="table">
        <thead>
            <tr>
            <th>Mã SP</th>
            <th>Tên SP</th>
            <th>Giá </th>
            <th>Hình ảnh</th>
            <th></th>
            </tr>
        </thead>
        <tbody id="tblDanhSachSanPham">

        </tbody>
        </table>
    </div>
    `;
    document.getElementById('root').innerHTML = contentHTML;
}

const renderTable = () => {
    // getListProduct()
    callApi("SanPham", "GET", null)
        .then((result)=>{
            console.log(result.data);
            let contentTable = '';
            result.data.map((product)=>{
                contentTable += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.tenSP}</td>
                        <td>${product.gia}</td>
                        <td><img src="./${product.hinhAnh}" width="50" ></td>
                        <td><button class="btn btn-info" onclick="suaSanPham(${product.id})">Sửa</button></td>
                        <td><button class="btn btn-danger" onclick="xoaSanPham(${product.id})" >Xóa</button></td>
                    </tr>
                `;
                
            })
            document.getElementById('tblDanhSachSanPham').innerHTML = contentTable;
        })
        .catch((error)=>{
            console.log(error);
        });
    
}

renderHTML();
renderTable();

//Chuc nang xoa
console.log(window);
window.xoaSanPham = xoaSanPham;

function xoaSanPham(id){
    console.log(id);
    callApi(`SanPham/${id}`, "DELETE", null)
        .then((result)=>{
            alert('Xóa thành công');
            renderTable();
        })
        .catch((error)=>{
            console.log(error);
        });
}
//Chuc nang sua
window.suaSanPham = suaSanPham;

function suaSanPham(id){
    console.log(id);
    getProductById(id)
        .then((result)=>{
            console.log(result.data);
            document.getElementById('maSP').value = result.data.id;
            document.getElementById('tenSP').value = result.data.tenSP;
            document.getElementById('gia').value = result.data.gia;
            document.getElementById('hinhAnh').value = result.data.hinhAnh;
           
        })
        .catch((err)=>{
            console.log(err);
        });
}

//Chuc nang cap nhat
document.getElementById('btnCapNhat').addEventListener("click",function(){
    let maSP = document.getElementById('maSP').value;
    let tenSP = document.getElementById('tenSP').value;
    let gia = document.getElementById('gia').value;
    let hinhAnh = document.getElementById('hinhAnh').value;

    let sanPham = new SanPham(maSP, tenSP, gia, hinhAnh);
    console.log(sanPham);
    updateProduct(maSP,sanPham)
        .then((result) => {
            console.log(result);
            alert('Cập nhật thành công');
            renderTable();
        })
        .catch(err =>{
            console.log(err);
        })
})


//Chuc nang them san pham

document.getElementById('btnThem').addEventListener("click",function(){
    
    let tenSP = document.getElementById('tenSP').value;
    let gia = document.getElementById('gia').value;
    let hinhAnh = document.getElementById('hinhAnh').value;

    let sanPham = new SanPham("", tenSP, gia, hinhAnh);

    addProduct(sanPham)
        .then(result => {
            alert('Thêm thành công');
            renderTable();
        })
        .catch(err => {
            console.log(err);
        });
})

