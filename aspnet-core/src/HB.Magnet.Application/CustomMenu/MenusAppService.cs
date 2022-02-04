using HB.Magnet.CustomMenu.Dto;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HB.Magnet.CustomMenu
{
    public class MenusAppService : MagnetAppServiceBase
    {
        [HttpGet]
        [ActionName("List/{Pid}")]
        public Task<List<CustomMenuOutputDto>> getListCustomMenu([FromRoute]int Pid)
        {
            List<CustomMenuOutputDto> outout = new List<CustomMenuOutputDto>();
            outout.Add(new CustomMenuOutputDto()
            {
                Id = 1,
                Pid = 0,
                Name = "BaseInfoSet",
                Component = "Layout",
                Meta = new MetaDto()
                {
                    Title = "基础信息",
                    Icon = "lock",
                },
                Children = new List<CustomMenuOutputDto>()
                {
                     new CustomMenuOutputDto()
                     {
                          Id = 2,
                          Pid = 1,
                          Name = "ProductClass",
                          Component = "Layout",
                          Meta = new MetaDto()
                          {
                              Title = "产品信息分类",
                              Icon="lock",
                              Roles = new List<string>()
                              {
                                  "editor",
                                  "admin"
                              }
                          },
                     },
                     new CustomMenuOutputDto()
                     {
                          Id=3,
                          Pid=1,
                          Name="ProductInfo",
                          Component = "Layout",
                          Meta = new MetaDto()
                          {
                              Title="产品信息",
                              Icon="lock",
                              Roles = new List<string>()
                              {
                                  "editor",
                                  "admin"
                              }
                          },
                     }
                }
            }); 

            return Task.FromResult(outout);
        }
    }
}
